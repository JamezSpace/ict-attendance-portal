const referenceDate = "2025-08-04";

export function dayOfConvention(): number {
    const today = new Date();
    const inputDate = new Date(referenceDate);

    // Normalize both dates to midnight (ignore time part)
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const diffInMs = inputDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays + 1;
}