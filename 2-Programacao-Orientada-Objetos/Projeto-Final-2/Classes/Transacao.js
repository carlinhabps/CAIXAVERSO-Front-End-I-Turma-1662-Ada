class Transacao {
  // ! Representa uma movimentação bancária (imutável — uma vez criada, não pode ser alterada (registro de auditoria))
  // ?   Atributos privados
  // * #tipo (string): "deposito", "saque", "transferencia" ou "rendimento"
  // * #valor (number)
  // * #data (Date): preenchida automaticamente com new Date()
  // * #descricao (string): opcional
  // ?   Métodos e getters
  // * Apenas getters para todos os atributos (sem setters — imutabilidade)
  // * exibir(): retorna string formatada com data, tipo, valor e descrição. Usar sinal '-' para saídas (saque, transferência enviada) e '+' para entradas (depósito, rendimento)
}
