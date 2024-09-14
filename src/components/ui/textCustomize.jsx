import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React from "react";

const TextCustomize = () => {
  return (
    <div className="flex gap-3 font-light">
      <BoldOutlined />
      <ItalicOutlined />
      <UnderlineOutlined />
      <AlignCenterOutlined />
      <AlignLeftOutlined />
      <AlignRightOutlined />
      <UnorderedListOutlined />
      <OrderedListOutlined />
      <BgColorsOutlined />
      <FontSizeOutlined />
    </div>
  );
};

export default TextCustomize;
