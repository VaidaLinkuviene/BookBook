package net.vaida.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO {

	private String name;
	private String description;
	private int ISBN;
	private String image;
	private int pages;
	private Category category;
	
	public BookDTO() {
		
	}
}