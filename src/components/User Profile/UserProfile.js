/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage/ProfilePage";
import MyRatings from "./MyRatings/MyRatings"
import MyComments from "./MyComments/MyComments";

const UserProfile = ({user, setCurrentForm, setCurrentId, setPreviousForm, previousProfileForm, setPreviousProfileForm, setHighlightMyComment, currentProfileForm, setCurrentProfileForm}) => {
    
    const recipes = useSelector((state)=>state.recipes)
    const savedRecipes = useSelector((state) => state.savedRecipes)
    const ratings = useSelector((state) => state.ratings);
    const allComments = useSelector((state) => state.allComments)
    const myRatings = ratings.flatMap(recipe => {
        return recipe.ratings.filter(rating => rating.user_id === user.id)
    })
    const myComments = allComments.flatMap(recipe => {
        return recipe.comments.filter(comment => comment.user_id === user.id)
    })


    useEffect(()=>{
        if(previousProfileForm) {
            setCurrentProfileForm(previousProfileForm)
            setPreviousProfileForm("")
        }
    },[previousProfileForm, setCurrentProfileForm, setPreviousProfileForm])

    return (
        <div>
            {currentProfileForm === "profilePage" && <ProfilePage user={user} recipes={recipes} savedRecipes={savedRecipes} myRatings={myRatings} setCurrentProfileForm={setCurrentProfileForm} myComments={myComments} />}
            {currentProfileForm === "myRatings" && <MyRatings setCurrentProfileForm={setCurrentProfileForm} myRatings={myRatings} recipes={recipes} setCurrentId={setCurrentId} setPreviousForm={setPreviousForm} setCurrentForm={setCurrentForm} setPreviousProfileForm={setPreviousProfileForm}/>}
            {currentProfileForm === "myComments" && <MyComments setCurrentProfileForm={setCurrentProfileForm} myComments={myComments} recipes={recipes} setCurrentId={setCurrentId} setPreviousForm={setPreviousForm} setCurrentForm={setCurrentForm} setPreviousProfileForm={setPreviousProfileForm} setHighlightMyComment={setHighlightMyComment}/>}
        </div>
    )
}

export default UserProfile;