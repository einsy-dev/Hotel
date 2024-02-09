import {
  updateHotel,
  createHotel,
  updateRoom,
  createRoom,
} from "../axios/admin.api";

export default function saveCard(
  data: any,
  navigate: any,
  isRoom: boolean = false
) {
  const formData = new FormData();
  !isRoom && formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("images", data.images);

  for (let i = 0; i < data.files.length; i++) {
    formData.append("files", data.files[i]);
  }

  if (!isRoom) {
    if (data.id !== undefined) {
      return updateHotel(formData, data.id).then(() =>
        navigate(0, { replace: true })
      );
    }
    return createHotel(formData)
      .then((res: any) => navigate(`/hotel/${res._id}`))
      .then(() => navigate(0, { replace: true }));
  } else {
    if (data.id !== undefined) {
      return updateRoom(formData, data.id).then(() =>
        navigate("/all", { replace: true })
      );
    }
    if (data.hotel) {
      formData.append("hotel", data.hotel);
      return createRoom(formData).then(() => navigate(0, { replace: true }));
    }
  }
}
