%Lagrange: Calcula los coeficienetes del polinomio de interpolación de
% grado n-1 para el conjunto de n datos (x,y), mediante el método de
% lagrange.
function [pol] = Lagrange(x,y)
% Convierte las entradas a tipo double para mayor precisión.
    x = double(x);
    y = double(y);
      % Obtiene la cantidad de puntos dados.
    n=length(x);
      % Inicializa una matriz para almacenar los términos Li(yi) / den.
    Tabla=zeros(n,n);
    % Itera sobre cada punto para calcular los términos Li(yi) / den.
    for i=1:n
        Li=1;
        den=1;
        % Itera sobre cada punto nuevamente para construir Li y den.
        for j=1:n
            if j~=i
            % Construye el polinomio paux = (x - xj).
                paux=[1 -x(j)];
                % Multiplica Li por (x - xj).
                Li=conv(Li,paux);
                 % Multiplica den por (xi - xj).
                den=den*(x(i)-x(j));
            end
        end
          % Almacena el término Li(yi) / den en la fila correspondiente de la matriz Tabla.
        Tabla(i,:)=y(i)*Li/den;
    end
    % Suma los términos para obtener el polinomio interpolante final.
    pol=sum(Tabla);

end