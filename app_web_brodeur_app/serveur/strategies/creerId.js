async function generateUniqueSessionId(client) {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000);
    const result = await client.query(
      "SELECT 1 FROM session_utilisateur WHERE id_session_utilisateur = $1",
      [id]
    );

    exists = result.rowCount > 0;
  }

  return id;
}
export default generateUniqueSessionId;
