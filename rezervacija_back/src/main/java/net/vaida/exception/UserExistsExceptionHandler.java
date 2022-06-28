package net.vaida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice
public class UserExistsExceptionHandler {
		@ExceptionHandler(value=UserExistsException.class)
		public ResponseEntity<Object> existsException(UserExistsException exception){
			return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
		}
}
