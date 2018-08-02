export const objectToArray = obj => {
  if (obj)
    return Object.entries(obj).map(e => Object.assign(e[1], { id: e[0] }));
};

export const createNewEvent = (user, photoURL, event) => {
  const  unixTimestamp = Math.floor(Date.now() / 1000);
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    created: unixTimestamp,
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: unixTimestamp,
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true
      }
    }
  };
};

export const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
