const notFoundMiddleWare = (req, res) => {
  // console.log('do i run?')
  res
    // .redirect("/404")
    .status(404)
    .send('Route does not exist');
}

export default notFoundMiddleWare;