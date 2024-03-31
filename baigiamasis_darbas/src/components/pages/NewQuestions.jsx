import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import QuestionContext from '../../contexts/QuestionsContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { QuestionsActionTypes } from '../../contexts/QuestionsContext';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding-bottom: 20px ;

    > button {
        position: absolute;
        top: 20px;
        left: 20px;
        border: none;
        background-color: transparent;
        color: #3f51b5;
        font-size: 2em;
        cursor: pointer;
    }

    > h2 {
        color: #3f51b5;
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    > form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 300px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 5px;

            > label {
                font-weight: bold;
            }

            > input {
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }

            > p {
                color: red;
                margin-top: 5px;
            }
        }

        > button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #3f51b5;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        > button:hover {
            background-color: #283593;
        }
    }
`;

const NewQuestions = () => {

    const navigate = useNavigate();
    const { loginUser } = useContext(UsersContext);
    const { setQuestions } = useContext(QuestionContext);

    const formik = useFormik({
        initialValues: {
            topic: '',
            question: ''
        },
        onSubmit: values => {
            const newCard = {
                id: uuid(),
                userId: loginUser.id,
                topic: values.topic,
                question: values.question,
                likes: [],
                dislikes: [],
                comments: []
            }
            setQuestions({
                type: QuestionsActionTypes.addNew,
                data: newCard
            });
            navigate(-1);
        },
        validationSchema: yup.object({
            topic: yup.string()
                .min(3, 'Topic must be at least 3 characters')
                .max(20, 'Topic must be at most 20 characters')
                .required('Topic is required')
                .trim(),
            question: yup.string()
                .min(10, 'Question must be at least 10 characters')
                .max(100, 'Question must be at most 100 characters')
                .required('Question is required')
                .trim()
        })
    });

    return ( 
        <StyledSection>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <h2>Ask new question</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='topic'>Title:</label>
                    <input 
                    type='text' 
                    id='topic' name='topic' 
                    onChange={formik.handleChange} 
                    value={formik.values.topic} 
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.topic && formik.errors.topic && 
                    <p>{formik.errors.topic}</p>}
                </div>
                <div>
                    <label htmlFor='question'>Question:</label>
                    <input 
                    type='text' 
                    id='question' name='question' 
                    onChange={formik.handleChange} 
                    value={formik.values.question} 
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.question && formik.errors.question && 
                    <p>{formik.errors.question}</p>}
                </div>
                <button type='submit'>Add question</button>
            </form>
        </StyledSection>
     );
}
 
export default NewQuestions;