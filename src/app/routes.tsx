import { Layout } from "@/components/shared/Layout";
import { Notes } from "@/features";
import { Archivide } from "@/features/archived/Archivde";
import { Login } from "@/features/auth/login";
import { Unarchived } from "@/features/unarcived/Unarcived";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/notes/archived" element={<Archivide />}></Route>
          <Route path="/notes/unarchived" element={<Unarchived />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
