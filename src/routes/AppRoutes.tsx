import Admin from "@/admin/Admin";
import { Introduction, Layout } from "@/components/shared";
import { PUBLIC_ROUTES, USER } from "@/config/route-constants";
import AddNote from "@/pages/add-note/AddNote";
import Auth from "@/pages/Auth";
import EditNote from "@/pages/edit-note/EditNote";
import Home from "@/pages/Home";
import NotesPage from "@/pages/notes-page/NotesPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ViewNote from "@/pages/ViewNote";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  const profileAdminPath = USER.PROFILE_ADMIN.replace(
    `${USER.PROFILE_HOME}/`,
    "",
  );
  const profileIntroPath = USER.PROFILE_INTRODUCTION.replace(
    `${USER.PROFILE_HOME}/`,
    "",
  );
  const profileNotesPath = USER.PROFILE_NOTES.replace(
    `${USER.PROFILE_HOME}/`,
    "",
  );
  const profileAddPath = USER.PROFILE_ADD.replace(`${USER.PROFILE_HOME}/`, "");
  const profileEditPath = USER.PROFILE_EDIT.replace(
    `${USER.PROFILE_HOME}/`,
    "",
  );
  const profileNotePath = USER.PROFILE_NOTE.replace(
    `${USER.PROFILE_HOME}/`,
    "",
  );

  return (
    <Routes>
      <Route path={USER.HOME} element={<Home />} />
      <Route path={PUBLIC_ROUTES.REGISTER} element={<Auth register />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Auth />} />
      <Route path={USER.PROFILE_HOME} element={<Layout />}>
        <Route path={profileAdminPath} element={<Admin />} />
        <Route path={profileIntroPath} element={<Introduction />} />
        <Route path={profileNotesPath} element={<NotesPage />} />
        <Route path={profileAddPath} element={<AddNote />} />
        <Route path={profileEditPath} element={<EditNote />} />
        <Route path={profileNotePath} element={<ViewNote />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
