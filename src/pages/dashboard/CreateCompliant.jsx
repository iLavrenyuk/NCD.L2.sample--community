import React from 'react';
import { useForm } from 'react-hook-form';
import { routes } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import { createFormSchema } from '../../validation';
import { addNewComplaint } from '../../services/near';
import { yupResolver } from '@hookform/resolvers/yup';
import { formFields, defaultValues } from '../../constants/formData';

export const CreateCompliant = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createFormSchema),
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const args = { ...data, category: parseInt(data.category) };
      await addNewComplaint(args);
      navigate(routes.Dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="shadow-2xl rounded-3xl mt-10 ml-10 px-12 py-4"
      style={{ width: '600px', background: 'rgba(255, 255, 255, 0.5)' }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full">
        {formFields.map((field) => (
          <div className="relative mt-8" key={field.id}>
            <h3 className="text-lg font-semibold" htmlFor="field.id">
              {field.label}
            </h3>
            <input
              className="outline-none shadow-xl w-full rounded-3xl py-4 px-6 mt-4"
              {...register(field.id)}
              type="text"
              placeholder="Write here"
            />
            {errors?.[field.id] && (
              <span className="absolute -bottom-6 px-6 left-0 font-semibold text-red-500">
                {errors?.[field.id]?.message}
              </span>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Category</h3>
          <select
            {...register('category')}
            className="outline-none bg-white shadow-xl w-full rounded-3xl py-4 px-6 mt-4"
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <div className="w-full mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-400 text-white text-lg font-semibold py-4 px-8 rounded-full"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
