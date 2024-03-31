import styled from "styled-components";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding: 20px;

    > button {
        border: none;
        background-color: transparent;
        color: #3f51b5;
        font-size: 2em;
        cursor: pointer;
        transition: color 0.3s ease;
        margin-bottom: 20px;
    }

    > button:hover {
        color: #283593;
    }

    > div {
        text-align: center;

        > h1 {
            color: #3f51b5;
            font-size: 2.5em;
            margin-top: 0;
            margin-bottom: 20px;
        }

        > p {
            color: #3f51b5;
            font-size: 1.5em;

            > a {
                text-decoration: none;
                color: #3f51b5;
                background-color: #b1b2c4;
                padding: 10px 20px;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }

            > a:hover {
                background-color: #283593;
                color: white;
            }
        }
    }
`;

const UserPage = () => {

    const { loginUser } = useContext(UsersContext);
    const { questions } = useContext(QuestionsContext);
    const location = useLocation();
    const userQuestions = questions.filter(question => question.userId === loginUser.id);

    return ( 
        <StyledSection>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <div>
                <h1>{loginUser.userName} Qusetions</h1>
                <p><Link to='/addNew'>Add new question</Link></p>
                {
                    userQuestions.length ?
                    <div>
                        {
                            userQuestions.map(question => 
                            <OneQuestion 
                            key={question.id} 
                            data={question} 
                            location={location}
                            />
                            )
                        }
                    </div> :
                    <p>No questions</p>
                }
            </div>
        </StyledSection>
     );
}
 
export default UserPage;