export default function (time) {
    if (!time) return "Not Valid";
    return (new Date(time)).toString();
}