export const parseTimeColon = (marchTimeStr: string) => {
  const time = { hours: 0, minutes: 0, seconds: 0 };
  const parts = marchTimeStr.split(":");
  if (parts.length < 2 || parts.length > 3) {
    throw new Error("Invalid time format, invalid number of parts");
  }
  //switch to SS:MM[:HH]
  parts.reverse();
  time.seconds = parseInt(parts[0]);
  time.minutes = parseInt(parts[1]);
  if (parts.length === 3) {
    time.hours = parseInt(parts[2]);
  }
  return time;
};

export const parseTimeNoColon = (marchTimeStr: string) => {
  const time = { hours: 0, minutes: 0, seconds: 0 };
  if (marchTimeStr.length > 6) {
    throw new Error("Invalid time format, too many digits");
  }

  const timeParts = marchTimeStr.split("").reduce((acc, c, i) => {
    if (i % 2 === 0) {
      acc.push(c);
    } else {
      acc[acc.length - 1] += c;
    }
    return acc;
  }, [] as string[]);

  timeParts.reverse();
  time.seconds = parseInt(timeParts[0]);
  if (timeParts.length > 1) time.minutes = parseInt(timeParts[1]);
  if (timeParts.length === 3) time.hours = parseInt(timeParts[2]);

  return time;
};

export const parseTime = (marchTimeStr: string, lastValidValue: string) => {
  if (marchTimeStr === null) return;
  if (Number.isNaN(Number.parseInt(marchTimeStr))) {
    marchTimeStr = lastValidValue;
    throw new Error("Invalid time format, numeric values only");
  }

  const marchTimeValue = marchTimeStr.replace(/[^0-9:]*/g, "").padStart(4, "0");
  if (marchTimeValue.length < 2 || marchTimeValue.length > 8) {
    throw new Error("Invalid time format, invalid length");
  }

  if (marchTimeStr.includes(":")) {
    return parseTimeColon(marchTimeStr);
  } else {
    return parseTimeNoColon(marchTimeStr);
  }
};
