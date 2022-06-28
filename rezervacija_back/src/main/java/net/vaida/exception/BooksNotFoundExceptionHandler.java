package net.vaida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BooksNotFoundExceptionHandler {
@ExceptionHandler(value=BooksNotFoundException.class)
public ResponseEntity<Object> notFoundException(BooksNotFoundException exception){
	return new ResponseEntity<>("Meal not found", HttpStatus.NOT_FOUND);
}
}
