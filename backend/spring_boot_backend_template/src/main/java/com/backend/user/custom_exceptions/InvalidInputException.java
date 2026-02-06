package com.backend.user.custom_exceptions;

@SuppressWarnings("serial")
public class InvalidInputException extends RuntimeException {
	public InvalidInputException(String message) {
		super(message);
	}
}
