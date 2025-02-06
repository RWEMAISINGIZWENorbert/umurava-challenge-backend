#                             Umurava challenge backend-api

# User routes entry point


1.**Sign up**:  
   ```
   http://localhost:{PORT DEFAULT = 8000}/user/register
   ```
2.**Login**:    
```
http://localhost:{PORT DEFAULT = 8000}/user/login
```
3.**Admin default credentials**: 
         -  Email: 
         ```
         admin@hotmail.com  
         ```
         -password:
          ```
         admin123
         ```

     
# Challenges routes entry point

1. **View All challenges**:  
```
http://localhost:{PORT DEFAULT = 8000}/challenge/challenges
```
2. **View one challenge By Id**:  
```
http://localhost:{PORT DEFAULT = 8000}/challenge/challenge/{id}
```
3. **View the limited challenges**:  
```
http://localhost:8000/challenge/limitedChallenges/{Limit number eg: 2}
```
4. **Total number of all challenges**: 
 ```
 http://localhost:{PORT DEFAULT = 8000}/challenge/Allchallenges 
 ```
5. **Total number of open challenges**:  
```
http://localhost:{PORT DEFAULT = 8000}/challenge/openChallenges
```
6. **Total number of closed challenges**: 
```
http://localhost:{PORT DEFAULT = 8000}/challenge/closedChallenges
```
7. **Create new challenge**: 
```
http://localhost:{PORT DEFAULT = 8000}/challenge/create
```
8. **Edit the challenge By id** : 
```
http://localhost:{PORT DEFAULT = 8000}/challenge/edit/{Challenge Id}
```
9. **Update the delete status** : 
```
http://localhost:{PORT DEFAULT = 8000}/challenge/update-delete
```
10. **Delete the challenge permanently**:   
```
http://localhost:{PORT DEFAULT = 8000}/challenge/delete-p/{Challenge Id}
```
