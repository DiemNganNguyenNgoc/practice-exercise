'use client'
import Button from "@/component/ButtonComponent";
import Input from "@/component/InputComponent";

export default function Home() {
  const validateNumber = (value: string) => {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 0 || number > 10 || isNaN(number)) {
      return "Chỉ nhập số nguyên từ 0-10";
    }
    return null;
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : "Sai định dạng email";
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6 space-y-6">

      {/* SECTION: Button */}
      <div>
        <h2 className="text-xl font-extrabold mb-2">Button - Variant</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-extrabold mb-2">Button - Size</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="2xs">2XS</Button>
          <Button variant="secondary" size="xs">XS</Button>
          <Button variant="success" size="sm">SM</Button>
          <Button variant="danger"size="md">MD</Button>
          <Button variant="info" size="lg">LG</Button>
          <Button variant="warning" size="xl">XL</Button>
          <Button variant="light" size="2xl">2XL</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-extrabold mb-2">Button - Rounded</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" rounded="none">NONE</Button>
          <Button variant="success" rounded="sm">SM</Button>
          <Button variant="danger"rounded="md">MD</Button>
          <Button variant="info" rounded="lg">LG</Button>
          <Button variant="warning" rounded="xl">XL</Button>
          <Button variant="light" rounded="2xl">2XL</Button>
          <Button variant="dark" rounded="full">FULL</Button>
        </div>
      </div>

       <div>
        <h2 className="text-xl font-extrabold mb-2">Button - Outline</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" rounded="none" isOutline={true}>PRIMARY</Button>
          <Button variant="success" rounded="sm" isOutline={true}>SUCCESS</Button>
          <Button variant="danger"rounded="md" isOutline={true}>DANGER</Button>
          <Button variant="info" rounded="lg" isOutline={true}>INFO</Button>
          <Button variant="warning" rounded="xl" isOutline={true}>WARNING</Button>
          <Button variant="light" rounded="2xl" isOutline={true}>LIGHT</Button>
          <Button variant="dark" rounded="full" isOutline={true}>DARK</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-extrabold mb-2">Button - State</h2>
        <div className="flex flex-wrap gap-2">
           <Button variant="primary" rounded="none" state="default">DEFAULT</Button>
          <Button variant="success" rounded="sm" state="loading">LOADING</Button>
          <Button variant="danger"rounded="md" state="disable">DISABLE</Button>
        </div>
      </div>

      {/* SECTION: Input */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold">Input</h2>
        <Input
          label="Number"
          type="number"
          validate={validateNumber}
        />
        <Input
          label="Email"
          type="email"
          validate={validateEmail}
        />
        <Input
          label="Text"
        />
        <Input
          label="Select"
          type="select"
          isComplex={true}
          data={["Hi", "Hello", "Goodbye", "Bye", "See you again", "See you later"]}
        />
         <Input
        label="Multi"
        type="multi"
        isComplex={true}
        data={["Hi", "Hello", "Goodbye", "Bye", "See you again", "See you later", "See you soon"]}/>
      </div>
    </div>
  );
}
