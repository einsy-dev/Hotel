import {
  createHotel,
  createRoom,
  updateHotel,
  updateRoom,
} from "../axios/appApi";

export default function saveCard(
  data: any,
  navigate: any,
  isRoom: boolean,
  hotel?: string,
  user?: string
) {
  const formData = new FormData();
  !isRoom && formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("images", data.images);

  for (let i = 0; i < data.files.length; i++) {
    formData.append("files", data.files[i]);
  }
  if (!isRoom) {
    if (data._id !== undefined) {
      updateHotel(formData, data._id).then(() =>
        navigate(0, { replace: true })
      );
    } else {
      createHotel(formData)
        .then((res: any) => navigate(`/hotel/${res._id}`))
        .then(() => navigate(0, { replace: true }));
    }
  } else {
    if (data._id !== undefined) {
      updateRoom(formData, data._id).then(() =>
        navigate("/all", { replace: true })
      );
    } else {
      createRoom(formData).then(() => navigate(0, { replace: true }));
    }
  }
}
