import { convertDateFormate } from "./../../../services/convertDateFormate";
import { Carousel } from "@mantine/carousel";
import { QUESTIONS_ICONS_LIST } from "./../../../../../constants/QuestionsIcons";
import { DEFAULT_ELEMENT_IMAGE } from "./../../../../../assets/icons/DefaultElementImage";

const Header = ({ heading, createdAt, updatedAt }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="sm:text-[32px] text-[24px] font-bold text-dark-blue">
        {heading}
      </h1>
      <p className="text-[16px] text-dark-blue opacity-50">
        Created on: {convertDateFormate.inspectionDetails(createdAt)}
      </p>
      <p className="text-[16px] text-dark-blue opacity-50">
        Updated on: {convertDateFormate.inspectionDetails(updatedAt)}
      </p>
    </div>
  );
};

const Root = ({ children }) => {
  return (
    <div className="space-y-[16px] sm:p-[20px] p-[12px] bg-white rounded-[16px] shadow-sm shadow-gray-100">
      {children}
    </div>
  );
};
const ImagesCarousel = ({ images }) => {
  return (
    <Carousel
      slideSize="202px"
      slideGap="10px"
      align="start"
      height={"100%"}
      initialSlide={1}
      slidesToScroll={4}
      containScroll={true}
      withIndicators={images.length > 3}
      withControls={images.length > 3}
      dragFree={images.length > 3}
      draggable={images.length > 3}
    >
      {images?.map((image) => (
        <Carousel.Slide key={image._id} className="w-fit rounded-[8px]">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.caption}
              className="w-[192px] h-[176px] object-cover rounded-[8px]"
            />
            <div
              className="absolute top-0 lef-0 w-full h-full flex items-end"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(14,8,84,0.3),rgba(14,8,84,0))",
              }}
            >
              <p className="m-[8px] text-[12px] font-bold text-white">
                {image.caption}
              </p>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

const RoomHeader = ({ heading, roomImages, roomNotes }) => {
  return (
    <>
      <h2 className="text-dark-blue font-bold text-[20px]">{heading}</h2>
      {roomImages?.length > 0 ? (
        <div className="bg-[#F3F8FF] rounded-[8px] p-[12px] h-[200px]">
          <ImagesCarousel images={roomImages} />
        </div>
      ) : (
        <div className="bg-[#F3F8FF] rounded-[8px] p-[12px] h-[200px] flex items-center justify-center">
          <p className="text-[14px] text-gray-500">No Room Image added.</p>
        </div>
      )}
      <div className={`${roomNotes ? "flex" : "hidden"} flex-col gap-[8px]`}>
        <p className="text-[16px] font-bold leading-none text-dark-blue">
          Notes
        </p>
        <p className="text-[14px] border border-[#CCE2FF] p-[12px] rounded-[8px] text-gray-500">
          {roomNotes ? roomNotes : "No Room Note added."}
        </p>
      </div>
    </>
  );
};

const RoomElementRoot = ({ children }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[16px] font-bold leading-none text-dark-blue">
        Elements
      </p>
      {children}
    </div>
  );
};

const RoomElement = ({ children }) => {
  return (
    <div className="border-[#CCE2FF] border rounded-[8px] text-dark-blue">
      {children}
    </div>
  );
};

const RoomElementHeader = ({ elementName, elementImageURL, elementNote }) => {
  return (
    <>
      <h3 className="text-[16px] font-bold border-b border-b-[#cce2ff] p-[16px]">
        {elementName}
      </h3>
      <div className="p-[16px] flex flex-col gap-[20px]">
        <div className={`flex flex-col gap-[8px]`}>
          <p className="text-[14px] font-semibold">Element Image</p>
          {elementImageURL ? (
            <img
              src={elementImageURL}
              alt="element"
              className="w-[100px] h-[100px] object-cover rounded-[8px]"
            />
          ) : (
            <DEFAULT_ELEMENT_IMAGE />
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <p className="text-[14px] font-semibold leading-none">Notes</p>
          <p className="text-[14px] text-gray-500">
            {elementNote ? elementNote : "No Element Note added."}
          </p>
        </div>
      </div>
    </>
  );
};

const ElementChecklist = ({ checkListQuestions }) => {
  return (
    <div className="flex flex-col gap-[8px] pt-[4px] px-[16px] pb-[16px]">
      <p className="text-[14px] font-semibold leading-none">Checklist</p>
      {checkListQuestions?.map((question, index) => (
        <div
          key={question._id}
          className={`${
            question.answer ? "flex" : "hidden"
          } flex-col gap-[8px]`}
        >
          <p className="text-[14px]">
            {index + 1}.&nbsp;{question.text}
          </p>
          <div>
            {question.type === "dropdown" || question.type === "textArea" ? (
              <div className="border border-[#CCE2FF] p-[12px] rounded-[8px] col-span-4">
                <p className="text-[14px] font-medium">{question.answer}</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 rounded-[8px]">
                {question.options.map((option, index) => (
                  <div
                    key={option._id}
                    className={`flex flex-col items-center bg-[#2a85ff24] p-[4px] ${
                      index === 0 && "rounded-l-[8px]"
                    } ${
                      index === question.options.length - 1 && "rounded-r-[8px]"
                    }`}
                  >
                    <div
                      className={`flex flex-col items-center ${
                        question.answer === option.option && "bg-primary"
                      } w-full rounded-[8px] p-[8px] ${
                        option.option === question?.answer && "text-white"
                      } text-[12px] text-center`}
                    >
                      {option.iconId ? (
                        QUESTIONS_ICONS_LIST.find(
                          (icon) => icon?.id === Number(option.iconId)
                        )?.icon
                      ) : (
                        <div
                          className={`border rounded-full w-[20px] h-[20px] flex justify-center items-center ${
                            option.option === question?.answer
                              ? "border-white text-white"
                              : "border-gray-dark"
                          }`}
                        >
                          <p className="text-[12px] font-medium leading-none">
                            {option?.option
                              ?.trim()
                              .split(" ")[0]
                              .charAt(0)
                              .toUpperCase()}
                          </p>
                        </div>
                      )}
                      {option.option}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const SignaturesRoot = ({ children }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[20px] font-bold text-dark-blue leading-none">
        Signatures
      </h3>
      <div className="grid grid-cols-2 gap-[20px]">{children}</div>
    </div>
  );
};

const SignatureCard = ({ signatoryName, signatoryRole, signatureURL }) => {
  return (
    <div className="space-y-[16px]">
      <div className="space-y-[8px]">
        <p className="text-[16px] text-dark-blue font-medium leading-none">
          {signatoryName}
        </p>
        <p className="text-dark-blue opacity-70 text-[16px]">{signatoryRole}</p>
      </div>
      <div className="border border-[#cce2ff] bg-white h-[160px] rounded-[8px] p-[16px]">
        {signatureURL && (
          <img
            src={signatureURL}
            alt="signature"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

const CompletedInspection = {
  Header,
  Root,
  RoomHeader,
  RoomElementRoot,
  RoomElement,
  RoomElementHeader,
  ElementChecklist,
  ImagesCarousel,
  SignaturesRoot,
  SignatureCard,
};

export default CompletedInspection;
