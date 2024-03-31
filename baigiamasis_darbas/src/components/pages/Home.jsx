import styled from "styled-components";
import { useContext, useState } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";
import { useLocation, useNavigate } from "react-router-dom";



const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;

  > h1 {
    color: #3f51b5;
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  > button {
    border: none;
    background-color: #3f51b5;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;
  }

  > button:hover {
    background-color: #283593;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;


    > button {
      border: 1px solid #3f51b5;
      border-radius: 5px;
      background-color: transparent;
      color: #3f51b5;
      padding: 10px 20px;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    > button:hover {
      color: #283593;
    }
  }
`;

const Home = () => {

    const {questions, setQuestions, refetch} = useContext(QuestionsContext);
    const location = useLocation();
    

    return ( 
        <StyledSection>
            <h1>All questions</h1>
            
            
            <div>
                {
                    questions.map(question => 
                        <OneQuestion 
                        key={question.id} 
                        data={question} 
                        location={location}
                        />
                    )
                }
            </div>
        </StyledSection>
     );
}
 
export default Home;