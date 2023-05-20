import "./App.css";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const Schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(100),
      password: z.string().min(5).max(30),
      confirmPassword: z.string().min(5).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password Does Not Match",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const formHandler = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formHandler)}>
        <h1>Zod & React Hook Form</h1>
        <label>First Name:</label>
        <input
          className={clsx(errors.firstName ? " error_input" : "")}
          type="text"
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="error_message">{errors.firstName.message}</span>
        )}
        <label>Last Name:</label>
        <input
          className={clsx(errors.lastName ? " error_input" : "")}
          type="text"
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="error_message">{errors.lastName.message}</span>
        )}
        <label>Email:</label>
        <input
          className={clsx(errors.email ? " error_input" : "")}
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="error_message">{errors.email.message}</span>
        )}
        <label>Age:</label>
        {errors.age && (
          <span className="error_message">{errors.age.message}</span>
        )}
        <input
          className={clsx(errors.age ? " error_input" : "")}
          type="number"
          {...register("age", { valueAsNumber: true })}
        />
        <label>Password:</label>
        <input
          className={clsx(errors.password ? " error_input" : "")}
          type="text"
          {...register("password")}
        />
        {errors.password && (
          <span className="error_message">{errors.password.message}</span>
        )}
        <label>Confirm Password:</label>
        <input
          className={clsx(errors.confirmPassword ? " error_input" : "")}
          type="text"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="error_message">
            {errors.confirmPassword.message}
          </span>
        )}
        <button type="submit">Submit Form</button>
      </form>
      <h3>By Topu Roy</h3>
    </div>
  );
}

export default App;
