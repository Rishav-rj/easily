export const setLastVisit = (req, res, next) => {
 
    if (req.cookies.lastVisit) {
      res.locals.lastVisit = new Date(
        req.cookies.lastVisit
      ).toLocaleString();
    }
    res.cookie(
      'lastVisit',
      new Date().toISOString(),
      {
        maxAge: 2 * 24 * 60 * 60 * 1000,
      }
    );
    console.log(req.cookies.lastVisit);
    next();
  };

// export const setLastVisit = (req, res, next) => {
//     try {
//         if (req.cookies && res.cookie) {
//             if (req.cookies.lastVisit) {
//                 res.cookie('lastVisit', new Date(req.cookies.lastVisit).toLocaleString());
//             }
//             res.cookie('lastVisit', new Date().toLocaleString(), {
//                     maxAge: 7 * 24 * 60 * 60 * 1000,
//             }); 

//         } else {
//             console.error('Error: req.cookies or res.cookie is undefined');
//         }
//     } catch (error) {
//         console.error('Error in setLastVisit middleware:', error);
//     }

//     next();
// };