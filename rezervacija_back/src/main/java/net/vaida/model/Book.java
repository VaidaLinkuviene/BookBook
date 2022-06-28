package net.vaida.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
public class Book {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "mealId_Sequence")
	//@SequenceGenerator(name = "id_Sequence", sequenceName = "ID_SEQ")
	private long id;
	private String name;
	private String description;
	private int ISBN;
	private String image;
	private int pages;
	
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="category_id", nullable=false)
	@OnDelete(action=OnDeleteAction.CASCADE)
	@JsonIgnore
	private Category category;

	public Book() {
		
	}

}
