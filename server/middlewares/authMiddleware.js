import passport from 'passport';

// This is a wrapper around passport.authenticate to handle errors properly
export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // Error during authentication
    if (err) {
      return next(err);
    }
    
    // Authentication failed - no user found or token invalid
    if (!user) {
      // Only redirect or respond if headers haven't been sent yet
      if (!res.headersSent) {
        return res.status(401).json({ 
          status: "failed", 
          message: info?.message || "Unauthorized access"
        });
      }
      return; // Do nothing if headers already sent
    }
    
    // Authentication successful
    req.user = user;
    return next();
  })(req, res, next);
};

// Use this middleware for routes that should be accessible only to authenticated users
export const isAuthenticated = (req, res, next) => {
  authenticateJWT(req, res, next);
};