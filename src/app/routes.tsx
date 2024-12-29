import { Layout } from "@/components/shared/Layout"
import { Notes } from "@/features"
import { Archivide } from "@/features/archived/Archivde"
import { Unarchived } from "@/features/unarcived/Unarcived"
import {BrowserRouter, Route, Routes} from "react-router-dom"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Notes/>}></Route>
                    <Route path="/archived" element={<Archivide/>}></Route>
                    <Route path="/unarchived" element={<Unarchived/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}