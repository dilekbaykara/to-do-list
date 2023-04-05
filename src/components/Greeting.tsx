// Time of day Greeting for User at top of page //

export function Greeting() {
  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  return <h1>Good {timeOfDay}</h1>;
}
