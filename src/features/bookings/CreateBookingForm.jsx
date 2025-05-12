import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import FormRow from "../../ui/FormRow";
import useSettings from "../settings/useSettings";
import useCabins from "../cabins/useCabins";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import useGuests from "../guests/useGuests";
import { differenceInDays, parseISO, startOfDay } from "date-fns";
import Checkbox from "../../ui/Checkbox";
import Textarea from "../../ui/Textarea";
import useCreatebooking from "./useCreatebooking";
import { getcountry } from "../../services/apiCountries";
import useCountries from "../guests/useCountries";

import { createGuest } from "../../services/ApiGuests";
import toast from "react-hot-toast";

const StyledSelect = styled.select`
  /* width: ; */
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function CreateBookingForm({ onCloseModal }) {
  const [wantBreakfast, setWantBreakFast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [userExist, setUserExist] = useState(false);

  const { cabins = {}, isLoading: isLoadingCabins } = useCabins();
  const { guests, isLoadingGuests } = useGuests();

  const { settings = {}, isLoading: isLoadingSettings } = useSettings();
  const { createBooking, isLoading: isCreatingBooking } = useCreatebooking();

  const { countries = [], isLoadingCountries } = useCountries();

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const countriesOrder = countries.map((coun) => coun.name.common).sort();

  if (
    isLoadingCabins |
    isLoadingSettings |
    isLoadingGuests |
    isLoadingCountries
  )
    return <Spinner />;

  function getCabinCapacity(cabinName) {
    const maxCapacity = cabins.find(
      (cab) => cab.name === cabinName
    ).maxCapacity;
    return maxCapacity;
  }

  async function onSubmit(data) {
    let guestId;
    const {
      fullName,
      email,
      nationalID,
      country,
      startDate,
      endDate,
      numGuests,
      observations,
      cabinName,
    } = data;

    const created_at = new Date().toISOString();
    const countryData = await getcountry(country);

    const countryCode = countryData.cca2.toLowerCase();

    if (!userExist) {
      const guestData = {
        created_at,
        fullName,
        email,
        nationalID,
        nationality: country,
        countryFlag: `https://flagcdn.com/${countryCode}.svg`,
      };
      const emailExist = guests.find((guest) => guest.email === email);
      const guestExist = guests.find(
        (guest) =>
          guest.nationalID === nationalID && country === guest.nationality
      );
      if (emailExist) {
        toast.error(
          "This email is already used, please provide a another email"
        );
        onCloseModal?.();
        return;
      }
      if (guestExist) {
        toast.error("This user already exist, please provide a valid user");
        onCloseModal?.();
        return;
      }
      if (!guestExist) guestId = await createGuest(guestData);
    } else {
      guestId = guests.find((guest) => fullName === guest.fullName)?.id;
    }

    const numNights = differenceInDays(new Date(endDate), new Date(startDate));
    const extrasPrice = wantBreakfast
      ? settings.breakfastPrice * Number(numGuests) * numNights
      : 0;
    const cabin = cabins.find((cab) => cabinName === cab.name);

    const cabinId = cabin.id;
    const cabinPrice = (cabin.regularPrice - cabin.discount) * numNights;
    const totalPrice = cabinPrice + extrasPrice;

    const bookingData = {
      created_at,
      startDate,
      endDate,
      numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: "unconfirmed",
      hasBreakfast: wantBreakfast,
      isPaid,
      observations,
      cabinId,
      guestId,
      numNights,
    };

    createBooking(bookingData, {
      onSuccess: () => {
        reset(), onCloseModal();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit /*, onError */)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Checkbox onChange={() => setUserExist((userExist) => !userExist)}>
        Does the user exist?
      </Checkbox>
      {userExist && (
        <FormRow label="Full Name" error={errors?.fullName?.message}>
          <StyledSelect id="fullName" {...register("fullName")}>
            {guests.map((guest) => (
              <option key={guest.id}>{guest.fullName}</option>
            ))}
          </StyledSelect>
        </FormRow>
      )}

      {!userExist && (
        <>
          <FormRow label="Full Name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Country" error={errors?.country?.message}>
            <StyledSelect id="country" {...register("country")}>
              {countriesOrder?.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </StyledSelect>
          </FormRow>

          <FormRow label="National Id" error={errors?.nationalId?.message}>
            <Input
              type="text"
              id="nationalID"
              {...register("nationalID", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>
        </>
      )}

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            validate: (val) => {
              const today = startOfDay(new Date());
              const selectedDate = startOfDay(parseISO(val)); // convierte string a Date
              return selectedDate > today || "Choose a date after today";
            },
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (val) =>
              (differenceInDays(val, getValues().startDate) >=
                settings.minBookingLength &&
                differenceInDays(val, getValues().startDate) <=
                  settings.maxBookingLength) ||
              `You can only reserve between ${settings.minBookingLength} and ${settings.maxBookingLength} nights`,
          })}
        />
      </FormRow>

      <FormRow label="Cabin name" error={errors?.cabinId?.message}>
        <StyledSelect id="cabinName" {...register("cabinName")}>
          {cabins.map((cabin) => (
            <option key={cabin.id}>{cabin.name}</option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          defaultValue={1}
          {...register("numGuests", {
            required: "Number of guest shloud be at least 1",
            min: {
              value: 1,
              message: "Guest should be more than 0",
            },
            validate: (value) =>
              value <= getCabinCapacity(getValues().cabinName) ||
              `The max number of guests for this cabin is ${getCabinCapacity(
                getValues().cabinName
              )} `,
          })}
        />
      </FormRow>

      <FormRow label="Observations">
        <Textarea
          type="text"
          id="observations"
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <Checkbox onChange={() => setWantBreakFast((breakfast) => !breakfast)}>
        Include Breakfast? for {settings.breakfastPrice} per people
      </Checkbox>

      <Checkbox disabled={isPaid} onChange={() => setIsPaid((paid) => !paid)}>
        I confirm that {getValues().fullName} has paid
      </Checkbox>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingBooking}>Add booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
