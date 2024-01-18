import {
  createHotel,
  createRoom,
  updateHotel,
  updateRoom,
} from "../axios/appApi";

export function saveCard(
  data: any,
  navigate: any,
  type: string,
  hotel?: string,
  user?: string
) {
  console.log(data);
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("images", data.images);

  for (let i = 0; i < data.files.length; i++) {
    formData.append("files", data.files[i]);
  }
  if (type === "hotel") {
    console.log("hotel");
    if (data._id !== undefined) {
      updateHotel(formData, data._id).then(() => document.location.reload());
    } else {
      createHotel(formData)
        .then((res: any) => navigate(`/hotel/${res._id}`))
        .then(() => document.location.reload());
    }
  } else if (type === "room") {
    console.log("room");
    formData.append("hotel", hotel!);
    if (data._id !== undefined) {
      updateRoom(formData, data._id);
    } else {
      createRoom(formData);
    }
  }
}
