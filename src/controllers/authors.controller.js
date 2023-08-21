import { pool } from "../db.js";

//Agregar un author
export const addAuthor = async (req, res) => {
  // console.log(req.body)   //VERIFICAR QUE ENVÍA DATOS DESDE EL CLIENTE
  try {
    const { name, nationality } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO authors (name,nationality) VALUES (?,?)",
      [name, nationality]
    );
    // console.log(rows)
    res.send({
      id: rows.insertId,
      name,
      nationality,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

//Obtener a un author
export const getAuthors = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM authors  ORDER BY author_id DESC LIMIT 10"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

export const getAuthor = async (req, res) => {
  try {
    // console.log(req.params.id)
    const [rows] = await pool.query(
      "SELECT * FROM authors WHERE author_id = ?",
      [req.params.id]
    );
    // console.log(rows[0])
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Author not found!",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, nationality } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE authors SET name = IFNULL(?,name), nationality=IFNULL(?,nationality) WHERE author_id=?",
      [name, nationality, id]
    );
    // console.log(result)
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Author not Found!",
      });
    const [rows] = await pool.query("SELECT * FROM authors WHERE author_id=?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE  FROM authors WHERE author_id = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      return res.status.json({
        message: "Author not found!",
      });
    res.send.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};
