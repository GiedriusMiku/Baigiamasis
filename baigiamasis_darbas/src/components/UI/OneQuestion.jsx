import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import { Link, NavLink } from "react-router-dom";

const StyledDiv = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;

    > h4 {
        color: #3f51b5;
        font-size: 1.5em;
        text-align: center;
    }

    > h2 {
        color: #3f51b5;
        font-size: 2em;
        text-align: center;
    }

    > a {
        color: #3f51b5;
        text-decoration: none;
        display: inline-block;
        margin: 10px 0;
        border: 1px solid #3f51b5;
        padding: 5px 10px;
        border-radius: 5px;
        
    }

    > a:hover {
        text-decoration: underline;
    }

    > div {
        display: flex;
        justify-content: center;
        gap: 10px;

        > button {
            padding: 10px;
            
            border-radius: 5px;
            background-color: #3f51b5;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        > button:hover {
            background-color: #283593;
        }

        > button > i:hover {
            color: #fff;
        }
    }
`;

const OneQuestion = ({data, location}) => {

    const { setQuestions } = useContext(QuestionsContext);
    const { loginUser } = useContext(UsersContext);

    return ( 
        <StyledDiv>
            <h4>{data.topic}</h4>
            <h2>{data.question}</h2>
            <Link to={`/${data.id}`}>More</Link>
                <div>
                    
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.likesQuestion,
                            id: data.id
                        })
                    }}>
                        <i className="bi bi-hand-thumbs-up"></i>
                        {loginUser ? 
                        data.likes.length
                        : <div><NavLink to='/user/login'></NavLink></div>}
                    </button>
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.dislikeQuestion,
                            id: data.id
                        })
                    }}>
                        <i className="bi bi-hand-thumbs-down"></i>
                        {loginUser ? 
                        data.dislikes.length
                        : <div><NavLink to='/user/login'></NavLink></div>}
                    </button>
                </div>

            
        </StyledDiv>
     );
}
 
export default OneQuestion;