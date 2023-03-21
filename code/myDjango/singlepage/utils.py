import re

# though models.EmailField already checks for email format, this is for additional restrictions
def checkEmailFormat(emailAddress):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, emailAddress)):
        return True
    else:
        return False
    
def checkPostalCodeFormat(postalCode):
    pass