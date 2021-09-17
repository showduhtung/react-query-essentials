const random = async (req, res) => {
  if (req.method === 'GET') {
    await new Promise(r => setTimeout(r, 500))
    res.json({
      random: Math.random(),
    })
  }
}
export default random
