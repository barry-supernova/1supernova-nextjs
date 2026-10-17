import Base from "@layouts/Baseof";
import Link from "next/link";

const Live = () => {
  return (
    <Base
      title="Supernova Three Founders Changing the World"
      description="Supernova Three Founders Changing the World"
    >
      <div className="container">
        <div className="lg:colo-8 mx-auto py-20 text-center">
          <h1 className="mb-8 text-h3 md:text-h2">
            Supernova Three Founders Changing the World
          </h1>
          <iframe
            className="aspect-video w-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/G2SqSljZBy4?si=-HnJcGhmEgU_XsxM"
            title="Supernova Three Founders Changing the World"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <Link
            href={"https://i9evkjegsiq.typeform.com/to/i1rwrmDp"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light mt-12 inline-block hover:bg-light-primary"
          >
            Ready Player World ✨
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default Live;
