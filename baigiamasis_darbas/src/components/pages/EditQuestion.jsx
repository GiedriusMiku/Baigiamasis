import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import * as yup from 'yup';
import { useFormik } from "formik";

const StyledSection = styled.section`
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 500px;

  > h1 {
    color: #3f51b5;
    font-size: 2.5em;
    text-align: center;
  }

  > form {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      > label {
        font-weight: bold;
        margin-bottom: 5px;
      }

      > input {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }

      > div {
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
const EditQuestion = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { questions, setQuestions } = useContext(QuestionsContext);
    const [initialValues, setInitialValues] = useState({ id:'', topic: '', question: '' }); 

    useEffect(() => {
        const questionToEdit = questions.find(question => question.id === id);
        if (questionToEdit) {
            setInitialValues({
                id: id,
                userName: questionToEdit.userName,
                topic: questionToEdit.topic,
                question: questionToEdit.question
            });
        }
    }, [id, questions]);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) =>{
            const editQuestion = questions.find(question => question.id === id);

            setQuestions({
                type: QuestionsActionTypes.edit,
                id: editQuestion.id,
                data: {
                    ...editQuestion,
                    topic: values.topic,
                    question: values.question
                }
            });
            navigate('/');
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
            <h1>Edit question</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='topic'>Topic:</label>
                    <input 
                    type='text' 
                    id='topic' name='topic' 
                    onChange={formik.handleChange} 
                    value={formik.values.topic} 
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.topic && formik.errors.topic && 
                    <div>{formik.errors.topic}</div>}
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
                    <div>{formik.errors.question}</div>}
                </div>
                <button type='submit'>Edit</button>
            </form>
            
        </StyledSection>
     );
}
 
export default EditQuestion;