import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useEditCabin from "../cabins/useEditCabin";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
    isLoading,
  } = useSettings();

  const { mutate, isLoading: isEditing } = useUpdateSettings();
  if (isLoading) return <Spinner />;

  function updateSetting(setting) {
    mutate(setting);
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => updateSetting({ minBookingLength: +e.target.value })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => updateSetting({ maxBookingLength: +e.target.value })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            updateSetting({ maxGuestsPerBooking: +e.target.value })
          }
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => updateSetting({ breakfastPrice: +e.target.value })}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
