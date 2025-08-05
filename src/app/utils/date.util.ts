const referenceDate = "2025-08-04";

export function dayOfConvention(): number {
    const today = new Date();
    const inputDate = new Date(referenceDate);

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const diffInMs = today.getTime() - inputDate.getTime(); 
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays + 1; 
}
