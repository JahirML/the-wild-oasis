import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Add new Booking</Button>
        </Modal.Open>
        <Modal.Window>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
