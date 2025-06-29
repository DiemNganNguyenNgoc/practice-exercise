'use client'
import { useState, ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  isComplex?: false | true;
  data?: string[] | "";
  validate?: (value: string) => string | null; // Trả về lỗi nếu có
}

export default function Input({
  label = "Text",
  type = "text",
  isComplex = false,
  data = "",
  validate,
  ...props
}: InputProps) {

  //State lưu dữ liệu
  const [value, setValue] = useState("");

  //State lưu lỗi (nếu có)
  const [error, setError] = useState<string | null>(null);

  //Biến lưu Placeholder theo mẫu mặc định
  const placeholder = props.placeholder || `Type ${type}...`;

  //Hàm cập nhật dữ liệu và lỗi cho input đơn giản
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (validate) {
      const err = validate(newValue);
      setError(err);
    }
  };

  //Hàm cập nhật dữ liệu cho input phức tạp 
  const handleChangeComplex = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  }

  //Hàm render loại input 
  const RenderInput = (type: string, data: string[] | string) => {
    switch (type) {
      case "select":
        return (
          <select
            onChange={handleChangeComplex}
            className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
            {(Array.isArray(data) && data.length > 0) ? (    //Kiểm tra mảng data không rỗng
              data.map((d, index) => (
                <option key={index} value={index}>
                  {d}
                </option>
              ))
            ) :
              (<option disabled>
                Không có dữ liệu
              </option>)
            }
          </select>
        )

      case "multi":
        return (
          <select multiple
            onChange={handleChangeComplex}
            className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>

            {(Array.isArray(data) && data.length > 0) ? (     //Kiểm tra mảng data không rỗng
              data.map((d, index) => (
                <option key={index} value={index}>
                  {d}
                </option>
              ))
            ) :
              (<option disabled>
                Không có dữ liệu
              </option>)
            }
          </select>
        )

      //Nhóm input đơn giản (text, number, email)
      default:
        return (
          <input
            {...props}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className={`p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
          />

        )
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-semibold">{label}</label>}
      {RenderInput(type, data)}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
