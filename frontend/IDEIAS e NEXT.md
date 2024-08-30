NEXT: Fazer o backend que recebe o registro de usuário, login e validate de token

1. (BACKEND) Bloqueio Temporário da Cotação (Rate Lock)
Como funciona: Quando o usuário inicia a transação, você pode bloquear a cotação atual por um curto período, como 1 a 2 minutos. Durante esse tempo, o usuário pode completar a transação e garantir a taxa exibida.
Implementação: Ao consultar a cotação do provedor de dados, você armazena essa taxa e apresenta ao usuário com uma mensagem clara de que a taxa está garantida por um determinado período.

5. (FRONTEND - BACKEND) Histórico de Taxas
Como funciona: Exiba o histórico de cotações ao longo de um curto período para que o usuário veja a tendência e tome uma decisão mais informada.
Implementação: Mostre um gráfico simples com as cotações dos últimos minutos ou horas, permitindo que o usuário veja como a taxa está variando antes de realizar a troca.

