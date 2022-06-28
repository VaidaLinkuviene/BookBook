package net.vaida.model;

	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.SequenceGenerator;

	import lombok.AllArgsConstructor;
	import lombok.Data;


	@Entity
	@Data
	@AllArgsConstructor
	public class Category {
		@Id
		@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "category_Sequence")
//		@SequenceGenerator(name = "cat_Sequence", sequenceName = "CAT_SEQ")
		private long id;
	//	
		private String categoryName;	
		public Category() {
			
		}
		
		

	}

