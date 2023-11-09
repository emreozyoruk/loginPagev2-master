import React, { useState } from 'react';
import './App.css';
import image from './images/image.jpg';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const App = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta alanı zorunludur'),
      username: Yup.string().required('Kullanıcı adı alanı zorunludur'),
      password: Yup.string().required('Şifre alanı zorunludur'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:3004/users', {
          users: [
            {
              email: values.email,
              username: values.username,
              password: values.password,
            },
          ],
        });

        console.log('Başarıyla gönderildi:', res.data);

        // Dönen veriyi kullanarak formu sıfırla
        formik.resetForm();
      } catch (error) {
        console.error('İstek gönderilirken bir hata oluştu:', error);
      }
    },
  });

  return (
    <div className="App" style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="genel">
          <h2 className="login">LOGIN</h2>
          <label className="label">Email Adresinizi Giriniz</label>
          <div className="input">
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="input"

          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
          </div>
          <label className="label">Kullanıcı Adınızı Giriniz</label>
          <div className="input">
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="input"

          />
          {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
          </div>
          <div className="input">
          <label className="label">Şifrenizi Giriniz</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="input"
          />
          {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
          </div>
          <button type="submit" className="button">
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
