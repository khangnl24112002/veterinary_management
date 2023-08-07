/* eslint-disable react/prop-types */
const Index = ({ type, content, name, register }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        className="border-teal-600/75"
        placeholder={content}
        {...register}
      />
    </div>
  );
};

export default Index;
