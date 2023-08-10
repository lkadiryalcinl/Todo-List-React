import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({

    username: Yup.string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
});

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    repass: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const TodoValidation = Yup.object().shape({
    title: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(4, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    date: Yup.object().shape({
        dateStart: Yup.date()
            .required('Required'),
        dateEnd: Yup.date()
            .required('Required')
    })

})

const UserUpdateValid = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),

})

const ChangePasswordValid = Yup.object().shape({
    oldpass: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    newpass: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    passagain:Yup.string()
    .oneOf([Yup.ref('newpass'), null], 'Passwords must match')
    
})

export {
    LoginSchema,
    SignUpSchema,
    TodoValidation,
    UserUpdateValid,
    ChangePasswordValid
}