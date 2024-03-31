import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding: 20px;

    > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        max-width: 600px;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

        > div {
            display: flex;
            justify-content: flex-end;

            > button {
                border: none;
                background-color: transparent;
                color: #3f51b5;
                font-size: 1.5em;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            > button:hover {
                color: #283593;
            }
        }

        > h4 {
            color: #3f51b5;
            font-size: 1.5em;
            margin-bottom: 10px;
        }

        > h2 {
            color: #3f51b5;
            font-size: 2em;
            margin-bottom: 20px;
        }

        > form {
            display: flex;
            flex-direction: column;
            gap: 20px;

            > div {
                display: flex;
                flex-direction: column;
                gap: 5px;

                > label {
                    font-weight: bold;
                }

                > textarea {
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
    }
`;

const OneQuestionPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { loginUser } = useContext(UsersContext);
    const { setQuestions, questions } = useContext(QuestionsContext);
    const question = questions.find(question => question.id === id);

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: Yup.object({
            text: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .max(300, 'Must be 300 characters or less')
            .required('Required')
            .trim()
        }),
        onSubmit: (values) => {
            const newComment = {
                id: uuid(),
                questionId: question.id,
                userId: loginUser.id,
                text: values.text
            }
            setQuestions({
                type: QuestionsActionTypes.addComment,
                comment: newComment,
                questionId: question.id
            });
            formik.resetForm();
        }
    });

    return ( 
        <StyledSection>
        {
            questions.length &&
            <div>
                <div>
                    {
                        loginUser.id === question.userId && 
                        <button onClick={() => 
                            navigate(`/${question.id}/edit`)}
                            ><i className="bi bi-pencil-square"></i></button>
                    }
                {
                    loginUser.id === question.userId && 
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.delete,
                            id: question.id
                        });
                        navigate('/');
                    }}><i className="bi bi-trash3-fill"></i></button>
                }
                </div>
                <h4>{question.topic}</h4>
                <h2>{question.question}</h2>
                
                
                
            </div> 
        }
        </StyledSection>
     );
}
 
export default OneQuestionPage;