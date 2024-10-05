import success from "../../public/images/icon-success-check.svg";
export default function Modal() {
  return (
    <div className="flex justify-center">
      <div className="bg-black/60  rounded-lg p-2 w-3/4">
        <div className=" flex gap-2 items-center">
          <img src={success} alt="Message sent" width={15} />
          <h3 className="text-white text-xs font-semibold">Message sent!</h3>
        </div>
        <p className="text-white text-[10px] pt-2">
          Thanks for completing the form. We'll be in touch soon
        </p>
      </div>
    </div>
  );
}
