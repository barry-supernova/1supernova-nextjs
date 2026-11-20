import Image from 'next/image';

const BlockQuote = ({ customerImage, customerName, customerRole, content }) => {
  return (
    <div className="my-8 rounded-xl bg-dark-quaternary p-5 md:rounded-3xl md:px-9 md:py-10">
      <blockquote className="m-0 p-0">
        <p className="!mt-0 mb-8 bg-gradient-text bg-clip-text text-h5 font-semibold leading-tight text-transparent before:hidden lg:text-h4/snug">
          {content}
        </p>
      </blockquote>
      <div className="flex items-center gap-5">
        {customerImage && <Image
          src={customerImage}
          alt={customerName}
          width={56}
          height={56}
          className="my-0 h-14 w-14 rounded-full object-cover"
        />}
        <div className=" flex flex-col text-base-sm md:text-base">
          <p className="my-0">{customerName}</p>
          <div className="flex items-center gap-3">
            <div className="my-0 size-2 rounded-full bg-secondary-800"></div>
            <p className="relative my-0  text-xs md:text-sm">{customerRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockQuote;
