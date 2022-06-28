package net.vaida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BooksExistsExceptionHandler {
@ExceptionHandler(value=BooksExistsException.class)
public ResponseEntity<Object> existsException(BooksExistsException exception){
	return new ResponseEntity<>("Meal already exists", HttpStatus.BAD_REQUEST);
}
}
