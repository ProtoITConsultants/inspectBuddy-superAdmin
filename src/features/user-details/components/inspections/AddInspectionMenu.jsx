import { Menu } from "@mantine/core";
import { ARROW_DOWN_ICON } from "../../../../assets/icons/DynamicIcons";
import selectTemplateIcon from "../../../../assets/icons/template-icon.svg";
import startFromScratchIcon from "../../../../assets/icons/scratch-icon.svg";

const AddInspectionMenu = ({ disabled = false }) => {
  return (
    <Menu shadow="md" position="bottom-end" disabled={disabled}>
      <Menu.Target>
        <button
          className={` text-white px-[24px] py-[12px] rounded-[8px] h-fit min-w-[190.14px] sm:ml-[16px] sm:w-fit w-full flex items-center gap-[8px] ${
            disabled ? "bg-dark-gray hover:!cursor-not-allowed" : "bg-primary"
          }`}
        >
          <span>New Inspection</span>
          <ARROW_DOWN_ICON className="text-white" />
        </button>
      </Menu.Target>

      <Menu.Dropdown className="!px-[10px] !py-[10px] !rounded-[8px] !border-[#cce2ff] !border-[1.5px]">
        <Menu.Item
          leftSection={
            <img
              src={selectTemplateIcon}
              alt="settings-icon"
              style={{ width: 20, height: 20 }}
            />
          }
          className="!text-[#000929] font-medium"
          onClick={() => {}}
        >
          Select a Template
        </Menu.Item>

        <Menu.Divider className="!border-[#CCE2FF]" />

        <Menu.Item
          leftSection={
            <img
              src={startFromScratchIcon}
              alt="trash-icon"
              style={{ width: 20, height: 20 }}
            />
          }
          className="!text-[#000929] font-medium"
          onClick={() => {}}
        >
          Start from Scratch
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddInspectionMenu;
