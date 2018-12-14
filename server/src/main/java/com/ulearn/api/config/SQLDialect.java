package com.ulearn.api.config;

import java.sql.Types;

import org.hibernate.dialect.Dialect;

public class SQLDialect extends Dialect {
	
	public SQLDialect() {
		registerColumnType(Types.BIGINT, "bigint");
		registerColumnType(Types.INTEGER, "integer");
		registerColumnType(Types.VARCHAR, "varchar");
	}
	
	public boolean supportIdentityColumns() {
		return true;
	}
	
	public boolean hasDataTypeInIdentityColumn() {
		return false;
	}

}
