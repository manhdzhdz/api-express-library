import { pool } from "../db.js"
export const getPing=async(req,res)=>{
    const [result]=await pool.query('SELECT 2+2 AS RESULT')
    res.json(result[0])
}